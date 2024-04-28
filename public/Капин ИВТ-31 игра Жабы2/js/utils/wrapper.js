function nodeFactory(node) {
	if (typeof node === "object") {
		return node;
	}

	if (node[0] === "#" || node[0] === ".") {
		const foundNode = document.querySelector(node);

		if (!foundNode) {
			throw new Error(`Элемент "${node}" не найден в DOM деревее`);
		}

		return foundNode;
	}

	return document.createElement(node);
}

class ElementWrapper {
	_nativeNode = null;
	_nodeType = "";

	_parentElementWrapper = null;

	_currentStyleTag = {};
	_currentListeners = new Map();
	_currentAttributes = new Map();
	_currentChilds = new Set();
	_currentClasses = new Set();
	_currentDisabled = false;

	constructor(node) {
		const instance = nodeFactory(node);

		this._nativeNode = instance;
		this._nodeType = instance.localName || instance.nodeName.toLowerCase();
	}

	style(styleOptions) {
		if (!this._nativeNode) {
			return this;
		}

		const styleKeys = Object.keys(styleOptions || {});

		if (!styleKeys.length) {
			this._currentStyleTag = {};
			this._removeAttribute("style");
			return this;
		}

		this._currentStyleTag = { ...styleOptions };

		const stringStyle = styleKeys.reduce((acc, key) => {
			acc += `${key}:${styleOptions[key]};`;
			return acc;
		}, "");

		this.setAttribute("style", stringStyle);

		return this;
	}

	on(type, handler) {
		if (!this._nativeNode) {
			return this;
		}

		if (!this._currentListeners.has(type)) {
			this._currentListeners.set(type, new Set());
		}

		this._currentListeners.get(type).add(handler);
		this._nativeNode.addEventListener(type, handler);

		return this;
	}

	off(type, handler) {
		if (!this._nativeNode || !this._currentListeners.has(type)) {
			return this;
		}

		if (!handler) {
			this._currentListeners.get(type).forEach((listener) => {
				this._nativeNode.removeEventListener(type, listener);
			});

			this._currentListeners.delete(type);
			return this;
		}

		const isRemoved = this._currentListeners.get(type).delete(handler);

		if (isRemoved) {
			this._nativeNode.removeEventListener(type, handler);
		}

		if (!this._currentListeners.get(type).size) {
			this._currentListeners.delete(type);
		}

		return this;
	}

	text(str) {
		if (!this._nativeNode) {
			return this;
		}

		if (typeof this._nativeNode.textContent !== "undefined") {
			this._nativeNode.textContent = str;
		} else {
			this._nativeNode.innerText = str;
		}

		return this;
	}

	class(...classes) {
		if (!this._nativeNode) {
			return this;
		}

		classes.forEach((className) => {
			if (this._currentClasses.has(className)) {
				return;
			}

			this._nativeNode.classList.add(className);
			this._currentClasses.add(className);
		});

		return this;
	}

	src(path) {
		if (!this._nativeNode) {
			return this;
		}

		this.setAttribute("src", path);
		return this;
	}

	removeClass(...classes) {
		if (!this._nativeNode) {
			return this;
		}

		classes.forEach((className) => {
			const isRemoved = this._currentClasses.delete(className);

			if (isRemoved) {
				this._nativeNode.classList.remove(className);
			}
		});

		return this;
	}

	forEach(callback) {
		if (!this._nativeNode) {
			return this;
		}

		this._currentChilds.forEach((child) => callback(child));
		return this;
	}

	offAllListeners() {
		if (!this._nativeNode || !this._currentListeners.size) {
			return this;
		}

		for (const type of this._currentListeners.keys()) {
			this.off(type);
		}

		return this;
	}

	append(...childs) {
		if (!this._nativeNode) {
			return this;
		}

		childs.forEach((child) => {
			if (child instanceof ElementWrapper) {
				child._setParent(this);
				this._nativeNode.append(child.getNodeRef());
				this._currentChilds.add(child);
				return;
			}

			const wrappedChild = new ElementWrapper(child);
			wrappedChild._setParent(this);
			this._nativeNode.append(wrappedChild.getNodeRef());
			this._currentChilds.add(wrappedChild);
			return;
		});

		return this;
	}

	remove() {
		if (!this._nativeNode) {
			return;
		}

		if (this.getParent()) {
			this.getParent().removeChild(this);
			return;
		}

		this.removeAllChild();
		this.offAllListeners();
		this._currentAttributes.clear();
		this._currentClasses.clear();
		this._currentStyleTag = {};

		this._nativeNode.remove();
		this._nativeNode = null;
	}

	removeChild(child) {
		if (!this._nativeNode) {
			return this;
		}

		if (this._currentChilds.has(child)) {
			this._currentChilds.delete(child);
			child._setParent(null);
			child.remove();
		}

		return this;
	}

	removeAllChild() {
		if (!this._nativeNode) {
			return this;
		}

		for (const child of this._currentChilds) {
			child._setParent(null);
			child.remove();
		}

		this._currentChilds.clear();
		return this;
	}

	setAttribute(name, stringValue) {
		if (!this._nativeNode) {
			return this;
		}

		this._nativeNode.setAttribute(name, stringValue);
		this._currentAttributes.set(name, stringValue);
		return this;
	}

	interaction(callback) {
		if (!this._nativeNode) {
			return this;
		}

		callback(this);
		return this;
	}

	disabled(isDisabled) {
		if (!this._nativeNode) {
			return this;
		}

		if (isDisabled && !this._currentDisabled) {
			this._currentDisabled = true;
			this.setAttribute("disabled", true);
			return this;
		}

		if (!isDisabled && this._currentDisabled) {
			this._currentDisabled = false;
			this._removeAttribute("disabled");
			return this;
		}

		return this;
	}

	getStyle() {
		return { ...this._currentStyleTag };
	}

	getParent() {
		return this._parentElementWrapper;
	}

	getNodeRef() {
		return this._nativeNode;
	}

	getClass() {
		return Array.from(this._currentClasses);
	}

	getChilds() {
		return Array.from(this._currentChilds);
	}

	getAttributes() {
		if (Object.fromEntries) {
			return Object.fromEntries(this._currentAttributes);
		}

		const obj = {};

		for (const [key, value] of this._currentAttributes) {
			obj[key] = value;
		}

		return obj;
	}

	_setParent(parentWrapper) {
		if (!this._nativeNode) {
			this._parentElementWrapper = null;
			return this;
		}

		this._parentElementWrapper = parentWrapper;
		return this;
	}

	_removeAttribute(name) {
		if (!this._nativeNode) {
			return this;
		}

		if (this._currentAttributes.has(name)) {
			this._currentAttributes.delete(name);
			this._nativeNode.removeAttribute(name);
		}

		return this;
	}
}

function w(node) {
	if (node instanceof ElementWrapper) {
		return node;
	}

	if (Array.isArray(node) || typeof node === "number") {
		throw new Error(
			'Функция-обертка "w(...)" ожидает: String / Element / ElementWrapper'
		);
	}

	return new ElementWrapper(node);
}
