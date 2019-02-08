class CannonballCalculator {

    constructor() {
        this.price_steelbars = 0;
        this.price_cannonballs = 0;
        this.profit_per_bar = 0;
        this.amount_steelbars = 0;
        this.time_to_bank = 0;
        this.time_per_inv = 162;
        this.time_to_finish = 0;
        this.gp_hour = 0;
        this.xp_hour = 0;
        this.cballs_hour = 0;
    }

    run() {
        cball_calc.init_values();
        let calc_result = this.calculate();
        this.populate_results(calc_result);
    }

    init_values() {
        this.price_steelbars = document.getElementById('price_steelbars').value;
        this.price_cannonballs = document.getElementById('price_cannonballs').value;
        this.profit_per_bar = (this.price_cannonballs*4) - this.price_steelbars;
        this.amount_steelbars = document.getElementById('amount_steelbars').value;
        this.time_to_bank = document.getElementById('time_to_bank').value;
        console.log(this.time_per_inv);
        console.log(this.time_per_inv + this.time_to_bank);
        this.time_per_inv = +this.time_per_inv + +this.time_to_bank;
    }

    calculate() {
        console.log(this.time_to_bank);
        console.log(this.time_per_inv);
        let trips_per_hour = 3600 / this.time_per_inv;
        console.log(trips_per_hour);
        let bars_per_hour = trips_per_hour * 27;

        let cballs_per_hour = bars_per_hour * 4;
        let gp_per_hour = this.profit_per_bar * bars_per_hour;
        let xp_per_hour = bars_per_hour * 25.5;

        return {    trips_per_hour : trips_per_hour,
                    bars_per_hour : bars_per_hour,
                    cballs_per_hour : cballs_per_hour,
                    gp_per_hour : gp_per_hour,
                    xp_per_hour : xp_per_hour
        };
    }

    format_number(number) {
        let formattedNumber = '';
        if(number > 9999) {
            formattedNumber = (number / 1000).toFixed(1) + 'k';
        }
        else if(number > 999999) {
            formattedNumber = (number / 10000).toFixed(1) + 'm';
        }
        else {
            formattedNumber = number.toFixed(0);
        }
        return formattedNumber;
    }

    populate_results(calc_result) {
        document.getElementById('spent_steel').innerHTML = this.format_number(this.price_steelbars * this.amount_steelbars) + ' gp spent on steel bars.';
        document.getElementById('value_cannonballs').innerHTML = 'When made to cannonballs, worth will be ' + this.format_number(this.amount_steelbars * 4 * this.price_cannonballs) + ' gp.';
        document.getElementById('cannonballs_hour').innerHTML = this.format_number(calc_result.cballs_per_hour) + ' cannonballs per hour.';
        document.getElementById('gp_per_hour').innerHTML = this.format_number(calc_result.gp_per_hour) + ' gp per hour';
        document.getElementById('xp_per_hour').innerHTML = this.format_number(calc_result.xp_per_hour) + ' xp per hour';
    }

}