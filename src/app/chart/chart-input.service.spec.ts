import { TestBed, inject } from '@angular/core/testing';

import { ChartInputService } from './chart-input.service';

describe('ChartInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartInputService]
    });
  });

  it('should be created', inject([ChartInputService], (service: ChartInputService) => {
    expect(service).toBeTruthy();
  }));
});
