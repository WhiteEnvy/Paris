import Global from './global';

declare let THREE: any;

class FBX {
    static path;
    static loader;
    static OBMLoader;

    static init(path) {
        this.path = path;
        this.loader = new THREE.FBXLoader();
    }

    static loadModel(name, fullUrl?) {
        return new Promise((resolve, reject) => {
            let path = fullUrl || `${this.path}/${name}/${name}.fbx`;
            this.loader.load(path, model => {
                resolve(model);
            },
                // process => console.log(true),
                // error => console.log(error)
            );
        });
    }

    static setAnimation(model) {
        if (model.animations && model.animations.length) {
            model.mixer = new THREE.AnimationMixer(model);
            Global.mixers.push(model.mixer);

            model.animations.forEach((animation, index) => {
                model.mixer.clipAction(animation);
                model.mixer._actions[index].name = animation.name;
            });
        }
    }

    static createAnimation(data) {
        let { name, duration, tracks } = data;
        let updatedTracks = [];

        tracks.forEach(track => {
            let vkft = new THREE.VectorKeyframeTrack(track.name, Object.values(track.times), Object.values(track.values), THREE.InterpolateLinear);
            updatedTracks.push(vkft)
        });

        return new THREE.AnimationClip(name, duration, updatedTracks);
    }
}

export default FBX;