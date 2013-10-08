define([
        "SolutionBase",
    ],
    function ( SolutionBase ) {

        function BruteSortSolution( $root ) {
            SolutionBase.prototype.constructor.call( this, $root );
            this.printLine("Brute Sort solving...");
        }

        BruteSortSolution.prototype = new SolutionBase;
        BruteSortSolution.prototype._super = SolutionBase.prototype;
        BruteSortSolution.prototype.constructor = BruteSortSolution;

        BruteSortSolution.prototype.solve = function( ) {

            //Here's where the magic happens...
            var curCircuit;
            var curJuggler;
            var firstPrefJugglers;

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

                    // re-sort with new first prefs
                    this.jugglers.sort( this._rankSortFunction );

                    this.printLine( curCircuit.getTeam() );
                }
            }

            // now that we're done processing all the preferences, we will have some jugglers that
            //  didn't get their preferred circuit, so let's just assign them by straight rank
            console.log(this.jugglers.length + " unlucky jugglers don't get assigned to any of their preferred circuits. :(");
            this.rankOnlyAssign( this.jugglers, this.circuits );
        };

        return BruteSortSolution;
    }
);