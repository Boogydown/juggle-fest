describe( "JugglerModel", function() {
    var jugglerStr = "J J0 H:3 E:9 P:2 C2,C0,C1";
    var juggler;
    var circuitsMock;
    var JugglerModel;

    require(['JugglerModel'], function(_JugglerModel){
        JugglerModel = _JugglerModel;
    });

    beforeEach( function() {
        circuitsMock = [
            { h:1, e:2, p:3, addJugglerPreference:function(){} },
            { h:4, e:5, p:6, addJugglerPreference:function(){} },
            { h:7, e:8, p:9, index:2, addJugglerPreference:function(){} }
        ];
        juggler = new JugglerModel( jugglerStr, circuitsMock );
        waitsFor( function() {return JugglerModel != null;})
    });

    describe( "parseStr", function() {
        it ( "should parse correct number of circuits", function() {
            expect( juggler.prefsKeep.length).toBe(3);
        });

        it( "should have populated with circuitnum and rank", function() {
            var pref = juggler.prefsKeep[ juggler.prefsKeep.length-1 ];
            expect( pref.circuitNum ).toBe(1);
            expect( pref.rank ).toBeDefined();
        });
    });

    describe( "removeCircuit", function() {
        it ( "should properly remove a circuit from beginning of the prefs list and shift the others up", function() {
            juggler.removeCircuit(2);
            expect( juggler.prefsToss[0].circuitNum).toBe(0);
            expect( juggler.prefsToss[1].circuitNum).toBe(1);
        });

        it ( "should properly remove a circuit from middle of the prefs list and shift the others up", function() {
            juggler.removeCircuit(0);
            expect( juggler.prefsToss[0].circuitNum).toBe(2);
            expect( juggler.prefsToss[1].circuitNum).toBe(1);
        });

        it( "should return whether the removed circuit was a #1 preference", function() {
            expect( juggler.removeCircuit(2)).toBe(true);
        });

        it( "should return whether the removed circuit was not #1 preference", function() {
            expect( juggler.removeCircuit(0)).toBe(false);
        });

        it( "should return whether the removed circuit was not its assignment", function() {
            juggler.assigned = circuitsMock[2];
            expect( juggler.removeCircuit(2)).toBe(false);
        });
    });

    describe( "firstRank getter", function() {
        it( "should return the first rank", function() {
            expect( juggler.firstRank).toBe(111);
        });

        it( "should return the first rank respectively, after removing the original first", function() {
            juggler.removeCircuit(2);
            expect( juggler.firstRank).toBe(27);
        });
    });

    describe( "calculateRanks", function() {
        it( "should calculate ranks between the juggler and a list of circuits", function() {
            expect( juggler.calculateRanks( circuitsMock )[2].firstRank).toBe(111);
            expect( juggler.calculateRanks( circuitsMock )[1].juggler).toBe(juggler);
            expect( juggler.calculateRanks( circuitsMock )[0].circuit).toBe(circuitsMock[0]);
        });
    });
});