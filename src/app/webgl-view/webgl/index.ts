import Utils from "./utils";
import Global from './global';
import TextureHelper from './texture';
import FBX from './fbx';
import Game from './game';

declare let THREE: any;

class SceneManager {
    static _container: any;
    static _scene: any;
    static _camera: any;
    static _renderer: any;
    static _raycaster: any;
    static _mouse: any;

    static init(container: any){
        Global.sm = this;
        this._container = container;
        this._scene = new THREE.Scene();
        // this._scene.fog = new THREE.Fog(0xffffff, 0.025, 100);
        this._camera = new THREE.PerspectiveCamera(55, this.container.offsetWidth / this.container.offsetHeight, 0.1, 3000);
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            shadowMapEnabled: true
        });

        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setClearColor(0x1e1e1e);
        this.container.appendChild(this.renderer.domElement);
        this.animate();

        Utils.addOrbitControls();
        Utils.addEventListeners();
        TextureHelper.init();
        FBX.init('./assets/models');
        Game.init();
    }

    static get container () {
        return this._container;
    }

    static get scene () {
        return this._scene;
    }

    static get camera () {
        return this._camera;
    }

    static get raycaster () {
        return this._raycaster;
    }

    static get mouse () {
        return this._mouse;
    }

    static get renderer () {
        return this._renderer;
    }

    static animate() {
        requestAnimationFrame(SceneManager.animate.bind(SceneManager));
        this.render();
        if(Utils.devModules){
            for(let prop of Object.values(Utils.devModules)){
                let p: any = prop;
                p.update();
            }
        }

      
    }
    
    static render() {
        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneManager;