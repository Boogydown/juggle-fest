define( [
        "StatsModel"
    ],
    function( StatsModel ) {
        function JugglerModel( statsStr, circuits ) {
            this.circuits = circuits;
            this.prefsToss = [];
            this.prefsKeep = [];
            StatsModel.prototype.constructor.call( this, statsStr );
        }

        JugglerModel.prototype = new StatsModel;
        JugglerModel.prototype._super = StatsModel.prototype;

        JugglerModel.prototype.parseStr = function( statsStr ) {
            this._super.parseStr.call( this, statsStr );
            function getVal( stat ) { return parseInt(stat.match(/[0-9]+/)[0]); }

            var circuitAry = statsStr.match(/C[0-9]+/g);
            var c, numCircuits;
            var prefsObj;
            var circuitNum;
            for ( c = 0, numCircuits = circuitAry.length; c < numCircuits; c++ ) {
                circuitNum = getVal( circuitAry[c] );
                prefsObj = {
                    circuitNum: circuitNum,
                    rank: this.calculateRank( this, this.circuits[ circuitNum ] )
                };
                this.prefsToss.push( prefsObj );
                this.prefsKeep.push( prefsObj );
                this.circuits[circuitNum].addJugglerPreference( this );
            }
        };

        /**
         * Remove the given circuit from the list of preferred circuit (i.e. it was closed)
         * @param circuitNum
         */
        JugglerModel.prototype.removeCircuit = function( circuitNum ) {
            for ( var c = 0, len = this.prefsToss.length; c < len; c++ ) {
                if ( this.prefsToss[c].circuitNum == circuitNum ){
                    this.prefsToss.splice(c,1);
                    return c == 0 && ( this.assigned === undefined || this.assigned.index != circuitNum );
                }
            }
        };

        /**
         * Get string of our preferences
         * @returns {string}
         */
        JugglerModel.prototype.getPrefs = function() {
            var prefStr = this.name;
            for ( var p = 0, len = this.prefsKeep.length; p < len; p++ ) {
                prefStr += ' C' + this.prefsKeep[p].circuitNum + ':' + this.prefsKeep[p].rank;
            }
            return prefStr;
        };

        /**
         * Calculate ranks between this juggler and the given circuits
         * @param circuits
         * @returns {Array} of {juggler:, circuit:, firstRank: }
         */
        JugglerModel.prototype.calculateRanks = function( circuits ){
            var ranks = [];
            for ( var i = 0, len = circuits.length; i < len; i++ ) {
                ranks.push( {
                    juggler: this,
                    circuit: circuits[i],
                    firstRank: this.calculateRank( this, circuits[i])
                } );
            }
            return ranks;
        };

        /**
         * Retrieve our highest preference rank
         */
        Object.defineProperty(JugglerModel.prototype, "firstRank", {
            get : function() {
                return this.prefsToss.length > 0 ? this.prefsToss[0].rank : 0;
            }
        });

        return JugglerModel;
    }
);