/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        let defined = true;

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Este teste verifica se as propriedade "url" do array "allFeeds" possuem valores.
         it('URL are defined', function(){
            defined = true;
            for(let i in allFeeds) {
                if (allFeeds[i].url === '') {
                    defined = false;
                };
            };

            expect(defined).toBe(true)
         })

        // Este teste verifica se as propriedade "name" do array "allFeeds" possuem valores.
        it('name are defined', function(){
            defined = true;
            for(let i in allFeeds) {
                if (allFeeds[i].name === '') {
                    defined = false;
                };
            };

            expect(defined).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){

        // Este teste garante que o menu esteja escondido por padrão
        it('is hidden by default', function() {
            let isHidden = false;

            if ($('body').hasClass('menu-hidden')) {
                isHidden = true;
            }

            expect(isHidden).toBe(true);
        });

        /* Este teste verifica se o menu aparace ao clicar no icone de menu
         * e desaparece ao clicar novamente.
         */
        it('changes visibility when the menu icon is clicked', function() {
            let clicked = false;

            $('.menu-icon-link').click()
                expect($('body').hasClass('menu-hidden')).toBe(false)
            $('.menu-icon-link').click()
                expect($('body').hasClass('menu-hidden')).toBe(true)
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        // Este teste verifica se há ao menos uma entrada (".entry") no container ".feed".
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least a single entry within the feed', function(done){
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
 });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        let currentFeed, latestFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                latestFeed = $('.feed').html();
                loadFeed(1, function() {
                    currentFeed = $('.feed').html();
                    done();
                });
            });
        });

        /* Este teste verifica se o novo feed carregado é diferente do anterior,
         * ou seja, se o conteudo é realmente alterado.
         */
        it('content changes when a new feed is loaded by the loadFeed function', function(done){
            expect(currentFeed).not.toEqual(latestFeed);
            done();
        });
    });
}());
