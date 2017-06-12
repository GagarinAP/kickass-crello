const chai     = require("chai"),
      chaiHttp = require("chai-http"),
      server   = require("../app.js"),
      should   = chai.should(),
      Todo     = require("../model/todo.js"),
      conf     = require("../conf/config.js"),
      mongoose = require("mongoose");

      mongoose.createConnection(conf.test_url);
      mongoose.Promise = global.Promise;

      chai.use(chaiHttp);

describe("Todos unit-tests", () => {
    beforeEach((done) => {
        Todo.remove({}, (err) => {
            done();
        });
    });

    describe("/GET todos", () => {
        it("/GET todos", (done) => {
            chai.request(server)
                .get("/api/todos")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe("/POST todo", () => {
        it("/POST todo", (done) => {
            let todo = { todo: "First", active: false };
            chai.request(server)
                .post("/api/todo")
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("todo");
                    res.body.should.have.property("active");
                    res.body.should.have.property("_id");
                    res.body.todo.should.equal("First");
                    res.body.active.should.equal(false);
                    done();
                });
        });
        it("/POST todo without active field", (done) => {
            let todo = { todo: "The Lord of the Rings" };
            chai.request(server)
                .post("/api/todo")
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("active");
                    res.body.should.have.property("todo");
                    res.body.todo.should.equal("The Lord of the Rings");
                    res.body.active.should.equal(true);
                    done();
                });
        });

    });

    describe("/GET/:id todo", () => {
        it("it should GET a todo by the given id", (done) => {
            let book = new Todo({ todo: "The Lord of the Rings", active: false });
            book.save((err, book) => {
                chai.request(server)
                    .get("/api/todo/" + book.id)
                    .send(book)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("todo");
                        res.body.should.have.property("active");
                        res.body.should.have.property("_id").eql(book.id);
                        done();
                    });
            });

        });
    });

    describe("/PUT/:id todo", () => {
        it("it should UPDATE a todo by change active field", (done) => {
            let book = new Todo({todo: "The Chronicles of Narnia", active: false});
            book.save((err, book) => {
                chai.request(server)
                    .put("/api/todo/" + book.id)
                    .send({todo: "The Chronicles of Narnia", active: true})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("active").eql(book.active === true);
                        done();
                    });
            });
        });
    });

    describe("/DELETE/:id todo", () => {
        it("it should DELETE todo and callback the status", (done) => {
            let book = new Todo({todo: "The Chronicles of Narnia", active: false});
            book.save((err, book) => {
                chai.request(server)
                    .delete("/api/todo/" + book.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("status").eql("deleted");
                        done();
                    });
            });
        });
    });

    describe("/DELETE all todos", () => {
        it("it should DELETE all todos with active field false", (done) => {
            let book = new Todo({todo: "The Chronicles of Narnia", active: false});
            let book2 = new Todo({todo: "The Chronicles of Narnia2", active: false});
            book.save();
            book2.save();
            chai.request(server)
                .delete("/api/todos")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eql("All deleted");
                    done();
                });
        });
    });

    afterEach((done) => {
        Todo.remove({}, (err) => {
            done();
        });
    });
});
