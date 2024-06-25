import { LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
export default class PortfolioUserStats extends LightningElement {
    thrailheadRankingImage = `${PortfolioAssets}/PortfolioAssets/Ranks/All star ranger.png`;
    badges = 777;
    points = 310062;
    trails = 82;
}
