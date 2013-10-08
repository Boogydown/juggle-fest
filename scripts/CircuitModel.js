define([
    "StatsModel",
    ],
    function ( StatsModel ) {

        function CircuitModel( statsStr ) {
            this.preferredJugglers = [];
            this.assignedJugglers = [];
            this.closed = false;
            StatsModel.prototype.constructor.call( this, statsStr );
        }

        CircuitModel.prototype = new StatsModel;
        CircuitModel.prototype.constructor = CircuitModel;

        /**
         * Add a juggler to our list of jugglers that have us as a preference
         * @param juggler
         */
        CircuitModel.prototype.addJugglerPreference = function( juggler ) {
            this.preferredJugglers.push(juggler);
        };

        /**
         * Assign a juggler to this circuit
         * @param juggler
         * @returns {Number}
         */
        CircuitModel.prototype.assignJuggler = function(juggler) {
            return this.assignedJugglers.push(juggler);
        };

        /**
         * Close this circuit by removing it from any jugglers having it as a preference
         */
        CircuitModel.prototype.close = function() {
            for ( var j = 0, numJugglers = this.preferredJugglers.length; j < numJugglers; j++ )
                this.preferredJugglers[j].removeCircuit( this.index );
            this.closed = true;
        };

        /**
         * Get an output string of this circuit's final team
         * @returns {string}
         */
        CircuitModel.prototype.getTeam = function() {
            var teamStr = this.name + ' ';
            for ( var j = 0, numJugglers = this.assignedJugglers.length; j < numJugglers; j++ ) {
                teamStr += this.assignedJugglers[j].getPrefs() + ", ";
            }
            return teamStr;
        };

        return CircuitModel;
    }
);