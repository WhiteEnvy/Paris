declare let THREE: any;

class TextureHelper {
	static textureLoader;

    static init() {
        this.textureLoader = new THREE.TextureLoader();
    }

	static getTexture(url) {
		let loading = new Promise((resolve, reject) => {
			let texture = this.textureLoader.load(url);
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			resolve(texture);
		});
		return loading;		
	}

	static copyTexture(obj) {
		let texture = obj.texture.clone();
		texture.imageSrc = obj.imageSrc;
		texture.objType = obj.type;
		return texture;
	}

	static cloneTextur(texture) {
		let newTexture: any = {};

		for (let prop in texture) {
			if (prop != "repeat") {
				newTexture[prop] = texture[prop];
			} else {
				newTexture.repeat = new THREE.Vector2(1, 1);
			}
		}

		return newTexture;
	}

	static setColor(model, color) {
		if (model.children.length) {
			model.traverse(child => {
				if (child instanceof THREE.Mesh) {
					if (child.material.length) {
						child.material.forEach(material => {
							material.color.setHex(color);
						})
					}
					else {
						child.material.color.setHex(color);
					}
				}
			});
		}
		else {
			model.active.material.color.setHex(color)
		}
	}
}

export default TextureHelper;