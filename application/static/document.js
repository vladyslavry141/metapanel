

export class Document {
  constructor(doc) {
    this.doc = doc;
  }
  static wrapTable(tableElement) {
    tableElement.delRow = (index) => {
      this.getElementsByTagName('tr').deleteRow(index);
    };
    tableElement.delAllRows = (from) => {
      for (let i = from; i < this.getElementsByTagName('tr').length; i) {
        this.deleteRow(from);
      }
    };
    tableElement.row = (index) => Document.wrap(this.getElementsByTagName('tr')[index]);
    tableElement.delRows = (from, count) => {
      for (let i = 0; i < count; i++) {
        this.delRow(from);
      }
    };
    tableElement.addRow = (index) => Document.wrap(this.insertRow(index));
  }
  static wrapRow(rowElement) {
    rowElement.addCell = (index) => Document.wrap(this.insertCell(index));
  }

  static wrap(domElement) {
    domElement.show = function() {
      this.hidden = false;
	    return this;
    };
    domElement.hide = function() {
      this.hidden = true;
	    return this;
    };
    domElement.setClass = function(className) {
	    this.className = className;
	    return this;
    };
    domElement.setHTML = function(html) {
      this.innerHTML = html;
	    return this;
    };
    domElement.addHTML = function(html) {
      this.innerHTML += html;
	    return this;
    };
    domElement.setText = function(text) {
      this.innerText = text;
	    return this;
    };
    domElement.addText = function(text) {
      this.innerText += text;
	    return this;
    };
    if (domElement.tagName === 'TR') {
      Document.wrapRow(domElement);
    }
    if (domElement.tagName === 'TABLE') {
      Document.wrapTable(domElement);
    }
    return domElement;
  }

  static wrapCollection(domElements) {
    for (let element of domElements) {
      element = Document.wrap(element);
    }
    return domElements;
  }

  getById(id) {
    return Document.wrap(this.doc.getElementById(id));
  }
  getBySelector(query) {
    return Document.wrap(this.doc.querySelector(query));
  }
  getByTag(tag) {
    return Document.wrapCollection(this.doc.getElementsByTagName(tag));
  }
}

