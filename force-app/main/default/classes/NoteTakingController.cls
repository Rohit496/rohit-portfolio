public without sharing class NoteTakingController {
    @AuraEnabled
    public static Boolean createNoteRecord(String title, String description) {
        System.debug('Entering createNoteRecord');
        try {
            if (!String.isBlank(title)) {
                My_Note__c noteRec = new My_Note__c(
                    Name = title,
                    NoteDescription__c = description
                );
                System.debug('noteRec: ' + noteRec);
                insert noteRec;
                System.debug('Note record inserted');
                return true;
            }
            System.debug('Title is blank, no record created');
            return false;
        } catch (Exception e) {
            System.debug('Error in createNoteRecord: ' + e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<My_Note__c> getNoteRecords() {
        System.debug('Entering getNoteRecords');
        return [
            SELECT Id, Name, NoteDescription__c, LastModifiedDate
            FROM My_Note__c
            ORDER BY LastModifiedDate DESC
        ];
    }

    @AuraEnabled
    public static Boolean updateNoteRecord(
        String noteId,
        String title,
        String description
    ) {
        System.debug('Entering updateNoteRecord');
        try {
            My_Note__c noteRec = [
                SELECT Id, Name, NoteDescription__c
                FROM My_Note__c
                WHERE Id = :noteId
                LIMIT 1
            ];
            noteRec.Name = title;
            noteRec.NoteDescription__c = description;
            update noteRec;
            System.debug('Note record updated');
            return true;
        } catch (Exception e) {
            System.debug('Error in updateNoteRecord: ' + e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean deleteNoteRecord(String noteId) {
        System.debug('Entering deleteNoteRecord');
        try {
            My_Note__c noteRec = [
                SELECT Id
                FROM My_Note__c
                WHERE Id = :noteId
                LIMIT 1
            ];
            delete noteRec;
            System.debug('Note record deleted');
            return true;
        } catch (Exception e) {
            System.debug('Error in deleteNoteRecord: ' + e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }
}
