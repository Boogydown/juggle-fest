define([
        "SolutionBase",
        "SmartCircuitModel"
    ],
    function ( SolutionBase, SmartCircuitModel ) {

        function SmartSortSolution( $root ) {
            SolutionBase.prototype.constructor.call( this, $root );
            this.printLine("Smart Sort solving...");
        }

        SmartSortSolution.prototype = new SolutionBase;
        SmartSortSolution.prototype._super = SolutionBase.prototype;
        SmartSortSolution.prototype.constructor = SmartSortSolution;

        SmartSortSolution.prototype.createModels = function( circuitStrs, jugglerStrs ) {
            var i, len;
            for ( i = 0, len = circuitStrs.length; i < len; i++ ){
                this.circuits.push(new SmartCircuitModel( circuitStrs[i]) );
            }

            this._super.createModels.call( this, [], jugglerStrs );
        };

        SmartSortSolution.prototype.solve = function( ) {

            //Here's where the magic happens...
            var curCircuit;
            var curJuggler;
            var firstPrefJugglers;
            var i, len;
            var found;

            this.jugglers.sort( this._rankSortFunction );
            while ( this.jugglers.length > 0 ) {

                // get top juggler
                curJuggler = this.jugglers.pop();

                // get top juggler's top circuit;  if none then we've filled all preferences, so on to next phase
                if( curJuggler.prefsToss.length == 0)
                    break;
                else
                    curCircuit = this.circuits[ curJuggler.prefsToss[0].circuitNum ];

                // assign juggler to circuit and close circuit if full
                if ( curCircuit.assignJuggler( curJuggler ) == this.numJugglersPerCircuit ) {

                    // close circuit and remove from other jugglers;
                    // if removing their 1st then their 2nd becomes 1st, etc;  keep these new firsts
                    firstPrefJugglers = curCircuit.close();

                    // re-sort with new first prefs, smartly (jugglers is already sorted)
                    // remove jugglers that had the closed circuit as a first preference...
                    for( i = 0, len = firstPrefJugglers.length; i < len; i++ ) {
                        found = this.jugglers.indexOf(firstPrefJugglers[i]);
                        this.jugglers.splice(found,1);
                    }
                    // now reinsert them, in order, based on their new first-preference
                    for ( i = 0, len = firstPrefJugglers.length; i < len; i++ ) {
                        this.sortedPlace( firstPrefJugglers[i], this.jugglers );
                    }

                    this.printLine( curCircuit.getTeam() );
                }
            }

            // now that we're done processing all the preferences, we will have some jugglers that
            //  didn't get their preferred circuit, so let's just assign them by straight rank
            console.log(this.jugglers.length + " unlucky jugglers don't get assigned to any of their preferred circuits. :(");
            this.rankOnlyAssign( this.jugglers, this.circuits );
        };

        /**
         * Uses binary search to place a juggler into the larger sorted jugglers list
         * @param juggler {JugglerModel} - juggler to insert
         * @param jugglers {array} - mast list of jugglers, sorted in ascending order
         */
        SmartSortSolution.prototype.sortedPlace = function ( juggler, jugglers ) {
            var start = 0, end = jugglers.length-1;
            var index = 0;
            var firstRank = juggler.firstRank;
            while ( end != start + 1 ) {
                index = Math.floor( (end - start) / 2 ) + start;
                if ( firstRank > jugglers[index].firstRank )
                    start = index;
                else
                    end = index;
            }
            index = firstRank < jugglers[start].firstRank ? start
                    : firstRank > jugglers[end].firstRank ? end+1
                    : end;
            jugglers.splice( index, 0, juggler);
        };

        return SmartSortSolution;
    }
);