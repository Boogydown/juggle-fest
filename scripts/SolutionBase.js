define( [
    "CircuitModel",
    "JugglerModel"
],
    function( CircuitModel, JugglerModel ) {
        "use strict";

        function SolutionBase ( $root ) {
            this.circuits = [];
            this.jugglers = [];
            this.numJugglersPerCircuit = 0;
            this.$root = $root || $('<p id="stubNotOnDom"></p>');
            this.$root.html("");
        }

        /**
         * Populate circuit and juggler models from the provided data
         * @param circuitStrs {[string]}
         * @param jugglerStrs {[string]}
         */
        SolutionBase.prototype.createModels = function( circuitStrs, jugglerStrs ) {
            var i, len;
            for ( i = 0, len = circuitStrs.length; i < len; i++ ){
                this.circuits.push(new CircuitModel( circuitStrs[i]) );
            }

            // this will also calculate the rank of each circuit for the juggler
            for ( i = 0, len = jugglerStrs.length; i < len; i++ ){
                this.jugglers.push(new JugglerModel( jugglerStrs[i], this.circuits));
            }

            this.numJugglersPerCircuit = this.jugglers.length / this.circuits.length;
        };

        /**
         * Assign jugglers to circuits based on rank, alone
         * @param jugglers {[JugglerModel]}
         * @param circuits {[CircuitModel]}
         */
        SolutionBase.prototype.rankOnlyAssign = function( jugglers, circuits ){
            var ranks = [];
            var rank;
            var i, len;
            if ( jugglers.length ) {
                for ( i = 0, len = jugglers.length; i < len; i++ ) {
                    ranks = ranks.concat( jugglers[i].calculateRanks( circuits ) );
                }
                ranks.sort( this._rankSortFunction );
                while ( ranks.length > 0 ) {
                    rank = ranks.pop();
                    if ( (rank.juggler.prefsToss.length) && (rank.circuit.assignedJugglers.length < this.numJugglersPerCircuit) ) {
                        rank.circuit.assignJuggler( rank.juggler );
                    }
                }
            }
        };

        /**
         * Array.sort function; sort in ascending order, highest rank at end
         * @param jugglerA {JugglerModel}
         * @param jugglerB {JugglerModel}
         * @returns {number}
         * @private
         */
        SolutionBase.prototype._rankSortFunction = function( jugglerA, jugglerB ) {
            return jugglerA.firstRank - jugglerB.firstRank;
        };

        SolutionBase.prototype.solve = function( ) {
            throw "SolutionBase.solve() must be overridden";
        };

        SolutionBase.prototype.printLine = function( line ) {
            this.$root.append("<p>" + line + "</p>");
        };

        return SolutionBase;
    }
);