import { Injectable } from '@angular/core';

@Injectable()
export abstract class BranchesCalculatorService {

}

@Injectable()
export class SimpleBranchesCalculatorService implements BranchesCalculatorService {

    constructor() { }
    
    private getData() {
        return this.http.get<IWords>('./assets/words.json');
    }
}
