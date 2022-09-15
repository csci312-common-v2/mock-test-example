

/**
 * Function takes in a Date object representing a birthday and returns
 * a Boolean depending on whether or not the birthday is today.
 * 
 * @param {Date} birthday 
 */
const isBirthday = function(birthday){
    const today = new Date();
    return today.getDate() == birthday.getDate() 
        && today.getMonth() === birthday.getMonth();
}

/**
 * Simple version to illustrate mocking
 */
test("Test if this works on the birthday",()=>{
    const birthday = new Date('August 15 1999');
    const today =  new Date("2022-08-15T12:00:00");
    jest.spyOn(global, 'Date').mockImplementation(()=> today);
    expect(isBirthday(birthday)).toBeTruthy();
    jest.restoreAllMocks();
});


/**
 * A more complete test that factors out the common code.
 * 
 * We can't factor out the mock because we still want to use Date to set 
 * the test birthday.
 */
describe("Check if today is birthday", ()=>{
    let today;

    beforeEach(()=>{
        today = new Date("2022-08-15T12:00:00"); // dates are mutable
    });

    afterEach(()=>{
        jest.restoreAllMocks();
    });

    test("It is the birthday", ()=>{
        const birthday = new Date('August 15 1999');
        jest.spyOn(global, 'Date').mockImplementation(()=> today);
        expect(isBirthday(birthday)).toBeTruthy();
    })

    test("It is not the birthday", ()=>{
        const birthday = new Date('August 14 1999');
        jest.spyOn(global, 'Date').mockImplementation(()=> today);
        expect(isBirthday(birthday)).toBeFalsy();
    })

})