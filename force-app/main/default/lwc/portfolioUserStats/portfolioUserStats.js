import { LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
export default class PortfolioUserStats extends LightningElement {
    // updated the values to match the user's stats
    thrailheadRankingImage = `${PortfolioAssets}/PortfolioAssets/Ranks/All star ranger.png`;
    badges = 777;
    points = 310062;
    trails = 82;
}
