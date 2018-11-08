import { Services } from './service';

it('gives random number between max and min',()=>{
    expect (Services.random(0,3)).toBeLessThanOrEqual(3);
    expect(Services.random(0,3)).toBeGreaterThanOrEqual(0);
})

