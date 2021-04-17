"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var api = axios.create({
  baseURL: 'https://api.github.com/'
});

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.repositories = [];
    this.formEl = document.getElementById("repo-form");
    this.listEl = document.getElementById("repo-list");
    this.inputEl = document.querySelector("input[name=repository]");
    this.registerHendlers();
  }

  _createClass(App, [{
    key: "registerHendlers",
    value: function registerHendlers() {
      var _this = this;

      this.formEl.onsubmit = function (e) {
        return _this.addRepository(e);
      };
    }
  }, {
    key: "setLoading",
    value: function setLoading() {
      var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (loading === true) {
        var loadingEl = document.createElement('span');
        loadingEl.appendChild(document.createTextNode("Carregando perfil..."));
        loadingEl.setAttribute("id", "loading");
        var divEl = document.createElement('div');
        divEl.setAttribute("id", "carregando");
        divEl.appendChild(loadingEl);
        this.formEl.appendChild(divEl);
      } else {
        document.getElementById('carregando').remove();
      }
    }
  }, {
    key: "addRepository",
    value: function () {
      var _addRepository = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var repoInput, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                repoInput = this.inputEl.value;

                if (!(repoInput.length === 0)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                this.setLoading();
                _context.prev = 5;
                _context.next = 8;
                return api.get("/users/".concat(repoInput));

              case 8:
                response = _context.sent;
                console.log(response);
                this.repositories.push({
                  name: response.data.name,
                  description: response.data.bio,
                  avatar_url: response.data.avatar_url,
                  html_url: response.data.html_url
                });
                this.inputEl.value = "";
                this.render();
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](5);
                alert("O repositório não existe");

              case 18:
                this.setLoading(false);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 15]]);
      }));

      function addRepository(_x) {
        return _addRepository.apply(this, arguments);
      }

      return addRepository;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.listEl.innerHTML = "";
      this.repositories.forEach(function (repo) {
        var imgEl = document.createElement("img");
        imgEl.setAttribute('src', repo.avatar_url);
        var titleEl = document.createElement("strong");
        titleEl.appendChild(document.createTextNode(repo.name));
        var descriptionEl = document.createElement("p");
        descriptionEl.appendChild(document.createTextNode(repo.description));
        var linkEl = document.createElement("a");
        linkEl.setAttribute("target", "_blank");
        linkEl.appendChild(document.createTextNode('Acessar'));
        linkEl.setAttribute("href", repo.html_url);
        var listItemEl = document.createElement("li");
        listItemEl.appendChild(imgEl);
        listItemEl.appendChild(titleEl);
        listItemEl.appendChild(descriptionEl);
        listItemEl.appendChild(linkEl);

        _this2.listEl.appendChild(listItemEl);
      });
    }
  }]);

  return App;
}();

new App();
