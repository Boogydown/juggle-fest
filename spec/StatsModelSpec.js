describe( "StatsModel", function() {
    var statStr;
    var StatsModel;
    require(['../scripts/StatsModel'], function(_StatsModel){
        StatsModel = _StatsModel;
    });

    beforeEach( function() {
        statStr = "J J0 H:3 E:9 P:2 C2,C0,C1";
        waitsFor( function() {return StatsModel != null;})
    });

    it ( "should parse the id and specs appropriately", function() {
        var stat = new StatsModel( statStr );
        expect( stat.name ).toBe( "J0" );
        expect( stat.index).toBe( 0 );
        expect( stat.e ).toBe( 9 );
        expect( stat.h ).toBe( 3 );
        expect( stat.p ).toBe( 2 );
    });

    it( "should properly calculate the dot product of two stat sets", function() {
        expect( StatsModel.prototype.calculateRank( {h:2, e:3, p:4}, {p:5, h:6, e:7} )).toBe(53);
    });
});