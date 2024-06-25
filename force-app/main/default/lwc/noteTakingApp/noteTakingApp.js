import { LightningElement, wire } from 'lwc';
import createNoteRecord from '@salesforce/apex/NoteTakingController.createNoteRecord';
import getNoteRecords from '@salesforce/apex/NoteTakingController.getNoteRecords';
import updateNoteRecord from '@salesforce/apex/NoteTakingController.updateNoteRecord';
import deleteNoteRecord from '@salesforce/apex/NoteTakingController.deleteNoteRecord';
import { refreshApex } from '@salesforce/apex';
import LightningConfirm from 'lightning/confirm';

const DEFAULT_NOTE_FORM = {
    Name: '',
    NoteDescription__c: ''
};

export default class NoteTakingApp extends LightningElement {
    noteList = [];
    showModal = false;
    noteRecord = { ...DEFAULT_NOTE_FORM }; // Ensure a new object is created
    wireNoteResult;
    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'clean',
        'table',
        'header',
        'color'
    ];

    get isFormInvalid() {
        return !(
            this.noteRecord &&
            this.noteRecord.NoteDescription__c &&
            this.noteRecord.Name
        );
    }

    @wire(getNoteRecords)
    notes(result) {
        this.wireNoteResult = result;
        const { data, error } = result;
        if (data) {
            console.log('data', data);
            this.noteList = data.map((note) => {
                let formattedDate = new Date(
                    note.LastModifiedDate
                ).toDateString();
                console.log('formattedDate', formattedDate);
                return { ...note, formattedDate };
            });
        } else if (error) {
            console.error('error', error);
        }
    }

    createNoteHandler() {
        this.noteRecord = { ...DEFAULT_NOTE_FORM }; // Reset the note record
        this.selectedRecordId = null; // Ensure no record is selected
        this.showModal = true;
    }

    closeModalHandler() {
        this.showModal = false;
        this.noteRecord = { ...DEFAULT_NOTE_FORM }; // Reset the note record
        this.selectedRecordId = null;
    }

    changeHandler(event) {
        const { name, value } = event.target;
        this.noteRecord = { ...this.noteRecord, [name]: value };
    }

    formSubmitHandler(event) {
        event.preventDefault();
        console.log('this.noteRecord', JSON.stringify(this.noteRecord));

        if (this.selectedRecordId) {
            this.updateNote();
        } else {
            this.createNote();
        }
    }

    createNote() {
        createNoteRecord({
            title: this.noteRecord.Name,
            description: this.noteRecord.NoteDescription__c
        })
            .then(() => {
                this.showModal = false;
                this.selectedRecordId = null;
                this.showToastMessage('Note created successfully', 'success');
                this.refresh();
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    showToastMessage(message, variant) {
        const ele = this.template.querySelector('c-notification');
        ele.showToast(message, variant);
    }

    selectedRecordId;
    editNoteHandler(event) {
        const { recordid } = event.target.dataset;
        console.log('recordid', recordid);
        const nodeRecord = this.noteList.find((note) => note.Id === recordid);
        this.noteRecord = {
            Name: nodeRecord.Name,
            NoteDescription__c: nodeRecord.NoteDescription__c
        };
        this.selectedRecordId = recordid;
        this.showModal = true;
    }

    get modalName() {
        return this.selectedRecordId ? 'Update Note' : 'Add Note';
    }

    updateNote() {
        const { Name, NoteDescription__c } = this.noteRecord;
        updateNoteRecord({
            noteId: this.selectedRecordId,
            title: Name,
            description: NoteDescription__c
        })
            .then(() => {
                this.showModal = false;
                this.selectedRecordId = null;
                this.showToastMessage('Note updated successfully', 'success');
                this.refresh();
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    handleError(error) {
        let errorMessage = 'Unknown error';
        if (Array.isArray(error.body)) {
            errorMessage = error.body.map((e) => e.message).join(', ');
        } else if (typeof error.body.message === 'string') {
            errorMessage = error.body.message;
        } else if (typeof error.message === 'string') {
            errorMessage = error.message;
        }
        console.error('error', errorMessage);
        this.showToastMessage(errorMessage, 'error');
    }

    refresh() {
        return refreshApex(this.wireNoteResult);
    }

    deleteNoteHandler(event) {
        this.selectedRecordId = event.target.dataset.recordid;
        this.handleConfirm();
    }

    async handleConfirm() {
        const confirmed = await LightningConfirm.open({
            message: 'Are you sure you want to delete this note?',
            variant: 'headerless',
            label: 'Delete Confirmation'
        });
        if (confirmed) {
            this.deleteNote();
        } else {
            this.showModal = false;
            this.selectedRecordId = null;
        }
    }

    deleteNote() {
        deleteNoteRecord({ noteId: this.selectedRecordId })
            .then(() => {
                this.showModal = false;
                this.selectedRecordId = null;
                this.showToastMessage('Note deleted successfully', 'success');
                this.refresh();
            })
            .catch((error) => {
                this.handleError(error);
            });
    }
}
