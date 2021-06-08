export class DateUtils{

    static getToday(){
        const now = new Date();

        return `${now.getFullYear()}${now.getMonth() < 10? '0'+now.getMonth(): now.getMonth()}${now.getDay() < 10? '0'+now.getDay(): now.getDay()}`;

    }

}