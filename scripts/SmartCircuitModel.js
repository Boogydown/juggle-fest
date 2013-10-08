define([
    "CircuitModel"
    ],
    function ( CircuitModel ) {

        function SmartCircuitModel( statsStr ) {
            CircuitModel.prototype.constructor.call( this, statsStr );
        }

        SmartCircuitModel.prototype = new CircuitModel;
        SmartCircuitModel.prototype._super = CircuitModel.prototype;
        SmartCircuitModel.prototype.constructor = SmartCircuitModel;

        SmartCircuitModel.prototype.close = function() {
            var juggler;
            var firstPrefs = [];
            for ( var j = 0, numJugglers = this.preferredJugglers.length; j < numJugglers; j++ ) {
                juggler = this.preferredJugglers[j];
                if ( juggler.removeCircuit( this.index ) )
                    firstPrefs.push( juggler );
            }
            this.closed = true;
            return firstPrefs;
        };

        SmartCircuitModel.prototype.assignJuggler = function(juggler) {
            juggler.prefsToss = [];
            juggler.assigned = this;
            return this.assignedJugglers.push(juggler);
        };

        return SmartCircuitModel;
    }
);