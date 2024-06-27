import { LightningElement, api } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
export default class PortfolioUserStats extends LightningElement {
    // updated the values to match the user's stats
    // thrailheadRankingImage = `${PortfolioAssets}/PortfolioAssets/Ranks/All star ranger.png`;
    thrailheadRankingImage;
    @api badges;
    @api points;
    @api trails;
    @api rank;

    renderedCallback() {
        if (this.rank) {
            let url = `${PortfolioAssets}/PortfolioAssets/Ranks/${this.rank}.png`;
            this.thrailheadRankingImage = url;
        }
    }
}
