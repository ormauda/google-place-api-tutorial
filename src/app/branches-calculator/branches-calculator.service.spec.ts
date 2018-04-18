import { TestBed, inject } from '@angular/core/testing';

import { BranchesCalculatorService } from './branches-calculator.service';

describe('BranchesCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchesCalculatorService]
    });
  });

  it('should be created', inject([BranchesCalculatorService], (service: BranchesCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
