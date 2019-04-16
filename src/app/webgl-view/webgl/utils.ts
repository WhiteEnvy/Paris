import Global from "./global";
declare let THREE: any;

class Utils {
    static devModules: any;

    static onWindowResize() {
        Global.sm.camera.aspect = Global.sm.container.offsetWidth / Global.sm.container.offsetHeight;
        Global.sm.camera.updateProjectionMatrix();
        Global.sm.renderer.setSize(Global.sm.container.offsetWidth, Global.sm.container.offsetHeight);
        Global.sm.render();
    }

    static addEventListeners() {
        window.addEventListener('resize', Utils.onWindowResize, false);
        // SceneManager.container.addEventListener('mousedown', this.onDocumentMouseDown, false);
        // window.addEventListener('keydown', onDocumentKeyPress, false);
        // window.addEventListener('mousewheel', updateLightPosition, false);
    }
    // if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
    // static onDocumentMouseDown(event){
    //     event.preventDefault();
    // }

    static addOrbitControls() {
        this.devModules = this.devModules || {};
        // debugger;
        this.devModules.controls = new THREE.OrbitControls(Global.sm.camera, Global.sm.renderer.domElement);
        this.devModules.controls.addEventListener('change', Global.sm.render.bind(Global.sm));
        this.devModules.controls.maxPolarAngle = Math.PI / 2;
        this.devModules.controls.maxDistance = 2000;
        this.devModules.controls.minDistance = 20;

    }
}

export default Utils;