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
        let trips_per_hour = 3600 / this.time_per_inv;
        let bars_per_hour = trips_per_hour * 27;
        let cballs_per_hour = bars_per_hour * 4,
            gp_per_hour = this.profit_per_bar * bars_per_hour,
            xp_per_hour = bars_per_hour * 25.5,
            value_cballs = this.amount_steelbars * 4 * this.price_cannonballs,
            value_steelbars = this.amount_steelbars * this.price_steelbars,
            time_to_finish = (this.amount_steelbars / 27) *  this.time_per_inv;

        return {    trips_per_hour : trips_per_hour,
                    bars_per_hour : bars_per_hour,
                    cballs_per_hour : cballs_per_hour,
                    gp_per_hour : gp_per_hour,
                    xp_per_hour : xp_per_hour,
                    value_cballs : value_cballs,
                    value_steelbars : value_steelbars,
                    time_to_finish : time_to_finish
        };
    }

    /**Takes a number and makes it more readable. Numbers above 10000 use K, numbers above 1000000 use M.
     * @param number - the number to format
     * @returns {*|string} - the formatted number
     */
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

    format_seconds(seconds) {
        let formatted_time = '';
        if(seconds > 7200) {
            formatted_time = (seconds / 3600).toFixed(2) + ' hours';
        }
        else if(seconds > 60) {
            formatted_time = (seconds / 60).toFixed(0) + ' minutes';
        }
        return formatted_time;
    }

    populate_results(calc_result) {
        document.getElementById('spent_steel').innerHTML = this.format_number(calc_result.value_steelbars) + ' gp spent on steel bars.';
        document.getElementById('value_cannonballs').innerHTML = 'When made to cannonballs, worth will be ' + this.format_number(calc_result.value_cballs) + ' gp.';
        document.getElementById('total_profit').innerHTML = 'Total profit will be ' + this.format_number(calc_result.value_cballs - calc_result.value_steelbars) + ' gp.';
        document.getElementById('cannonballs_hour').innerHTML = this.format_number(calc_result.cballs_per_hour) + ' cannonballs per hour.';
        document.getElementById('gp_per_hour').innerHTML = this.format_number(calc_result.gp_per_hour) + ' gp per hour';
        document.getElementById('xp_per_hour').innerHTML = this.format_number(calc_result.xp_per_hour) + ' xp per hour';
        document.getElementById('time_to_finish').innerHTML = 'It will take ' + this.format_seconds(calc_result.time_to_finish) + ' to finish smelting all ' + this.amount_steelbars + ' steel bars into cannonballs.';
    }
}