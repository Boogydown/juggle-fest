describe( "SmartCircuitModel", function() {
    var circuitStr = "C C0 H:7 E:7 P:10";
    var circuit;
    var SmartCircuitModel;

    require(['SmartCircuitModel'], function(_SmartCircuitModel){
        SmartCircuitModel = _SmartCircuitModel;
    });

    beforeEach( function() {
        circuit = new SmartCircuitModel( circuitStr );
        waitsFor( function() {return SmartCircuitModel != null;})
    });

    describe( "close", function() {
        beforeEach( function() {
            circuit.preferredJugglers = [
                {
                    removeCircuit:function(){ return false;},
                    name:"J0"
                },
                {
                    removeCircuit:function(){ return true;},
                    name:"J1"
                }
            ];
        });

        it( "should remove itself from other jugglers on close", function() {
            spyOn( circuit.preferredJugglers[0],'removeCircuit');
            spyOn( circuit.preferredJugglers[1],'removeCircuit');
            circuit.close();
            expect( circuit.preferredJugglers[0].removeCircuit).toHaveBeenCalledWith(0);
            expect( circuit.preferredJugglers[1].removeCircuit).toHaveBeenCalledWith(0);
        });

       it( "should return the 1st pref jugglers on close", function() {
            var firstPrefs = circuit.close();
            expect( firstPrefs.length).toBe(1);
            expect( firstPrefs[0].name ).toBe("J1");
        });

        it( "should remove the juggler's prefs when assigned", function() {
            var juggler = {prefsToss:[1,2,3]};
            circuit.assignJuggler( juggler );
            expect(juggler.prefsToss.length).toBe(0);
        });

        it( "should set juggler's assigned prop when assigned", function() {
            var juggler = {};
            circuit.assignJuggler( juggler );
            expect(juggler.assigned ).toBe(circuit);
        });

    })
});