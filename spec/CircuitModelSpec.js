describe( "CircuitModel", function() {
    var circuitStr = "C C0 H:7 E:7 P:10";
    var circuit;
    var CircuitModel;

    require(['CircuitModel'], function(_CircuitModel){
        CircuitModel = _CircuitModel;
    });

    beforeEach( function() {
        circuit = new CircuitModel( circuitStr );
        waitsFor( function() {return CircuitModel != null;})
    });

    it ( "should add jugglers to preferredJugglers", function() {
        circuit.addJugglerPreference("foo");
        expect( circuit.preferredJugglers[0] ).toBe("foo");
    });

    describe( "assignJuggler", function () {
        it( "should add jugglers to assignedJugglers", function() {
            circuit.assignJuggler("bar");
            expect( circuit.assignedJugglers[0]).toBe("bar");
        });
    });

    describe( "close", function() {
        beforeEach( function() {
            circuit.preferredJugglers = [
                {
                    removeCircuit:function(){},
                    isFirstPref:function(){return false;},
                    name:"J0"
                },
                {
                    removeCircuit:function(){},
                    isFirstPref:function(){return true;},
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
    })
});