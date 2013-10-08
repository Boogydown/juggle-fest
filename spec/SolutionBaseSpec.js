describe( "SolutionBase", function() {
    var jugglerStrs = [
        "J J0 H:3 E:9 P:2 C2,C0,C1",
        "J J1 H:4 E:3 P:7 C0,C2,C1",
        "J J2 H:4 E:0 P:10 C0,C2,C1",
        "J J3 H:10 E:3 P:8 C2,C0,C1",
        "J J4 H:6 E:10 P:1 C0,C2,C1",
        "J J5 H:6 E:7 P:7 C0,C2,C1",
        "J J6 H:8 E:6 P:9 C2,C1,C0",
        "J J7 H:7 E:1 P:5 C2,C1,C0",
        "J J8 H:8 E:2 P:3 C1,C0,C2",
        "J J9 H:10 E:2 P:1 C1,C2,C0",
        "J J10 H:6 E:4 P:5 C0,C2,C1",
        "J J11 H:8 E:4 P:7 C0,C1,C2"
    ];

    var circuitStrs = [
        "C C0 H:7 E:7 P:10",
        "C C1 H:2 E:1 P:1",
        "C C2 H:7 E:6 P:4"
    ];

    var SolutionBase;
    var solution;

    require(['SolutionBase'], function(_SolutionBase){
        SolutionBase = _SolutionBase;
    });

    beforeEach( function() {
        solution = new SolutionBase();
        solution.createModels( circuitStrs, jugglerStrs );
        waitsFor( function() {return SolutionBase != null;})
    });

    it ( "should create proper number of circuit models, in order", function() {
        expect( solution.circuits.length).toBe(3);
        expect( solution.circuits[2].name).toBe("C2");
    });

    it ( "should create proper number of juggler models, in order", function() {
        expect( solution.jugglers.length).toBe(12);
        expect( solution.jugglers[6].name).toBe("J6");
    });

    it ( "should have a rank sort function that sorts in ascending order", function() {
        expect( solution._rankSortFunction({firstRank:1},{firstRank:2})).toBe(-1);
    });

    it ( "should assign jugglers to circuits based solely on rank", function() {
        solution.rankOnlyAssign( solution.jugglers, solution.circuits );
        expect( solution.circuits[0].assignedJugglers[0]).toBe(solution.jugglers[6]);
    });
});