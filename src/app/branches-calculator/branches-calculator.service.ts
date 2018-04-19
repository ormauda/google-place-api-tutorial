import { Injectable } from '@angular/core';
import { IMarket } from '../models/IMarket';
import { HttpClient } from '@angular/common/http';
import { IMarkets } from '../models/IMarkets';
import { IBranch } from '../models/IBranch';

@Injectable()
export abstract class BranchesCalculatorService {
    init: () => void
    getBranchesDistanceFrom: (latitude: number, longitude: number) => Array<IBranch>
    calculateBestMarket: (sortedBranches: Array<IBranch>) => IMarket
}

@Injectable()
export class SimpleBranchesCalculatorService implements BranchesCalculatorService {

    private markets: Array<IMarket>;
    private readonly RELEVANT_RADIUS: number = 50000;

    constructor(private http: HttpClient) { }

    public init(): void {
        this.getData().subscribe(data => {
            this.markets = data.markets;
        });
    }

    public getBranchesDistanceFrom(latitude: number, longitude: number): Array<IBranch> {
        if (!this.markets) {
            console.error("markets array is not initialized");
        }

        let branchesDistances: Array<IBranch> = [];

        this.markets.forEach((market: IMarket) => {
            market.branches.forEach((branch: IBranch) => {
                let updatedBranch: IBranch = branch;
                updatedBranch.distance = google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(branch.latitude, branch.longitude),
                    new google.maps.LatLng(latitude, longitude)
                );
                branchesDistances.push(updatedBranch);
            })
        })

        return branchesDistances;
    }

    public calculateBestMarket(sortedBranches: Array<IBranch>): IMarket {
        let marketsRankings = new Map<IMarket, number>();
        this.markets.forEach((market: IMarket) => marketsRankings.set(market, 0));

        sortedBranches.forEach((sortedBranch: IBranch) => {
            if (sortedBranch.distance > this.RELEVANT_RADIUS) {
                return;
            }
            let market: IMarket = this.markets.find((market: IMarket) => {
                return market.branches.some((branch: IBranch) => branch.id === sortedBranch.id)
            })

            if (market) {
                let branchBonus = 1 / (Math.pow(sortedBranch.distance, 2));
                marketsRankings.set(market, marketsRankings.get(market) + branchBonus);
            }
        })

        let bestMarket: IMarket = Array.from(marketsRankings.keys()).reduce((a: IMarket, b: IMarket) =>
            marketsRankings.get(a) > marketsRankings.get(b) ? a : b
        );

        return bestMarket;
    }

    private getData() {
        return this.http.get<IMarkets>('../../assets/database/branches.json');
    }
}
