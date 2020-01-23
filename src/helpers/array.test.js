import { getNextArrayItem } from './array';

describe('src/helpers/array.js', () => {
    describe('getNextArrayItem', () => {
        describe('EMPTY array', () => {
            it('NO current item', () => {
                expect(getNextArrayItem()).toBeUndefined();
            });
            it('with current item', () => {
                expect(getNextArrayItem([], 1)).toBeUndefined();
            });
        });
        describe('FILLED array', () => {
            it('NO current item -> array[0]', () => {
                expect(getNextArrayItem([1, 2, 3])).toBe(1);
            });
            it('current item is the last array item -> array[0]', () => {
                expect(getNextArrayItem([1, 2, 3], 3)).toBe(1);
            });
            it('current item is NOT last array item -> array[next]', () => {
                expect(getNextArrayItem([1, 2, 3], 2)).toBe(3);
            });
        });
    });
});
