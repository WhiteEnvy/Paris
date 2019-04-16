import Utils from './utils';
import Global from './global';
import FBX from './fbx';
import TextureHelper from './texture';

declare let THREE: any;

class Game {

    static gs: Game
    static loadedModel;
    static amount;
    static pMaterial;
    static particleSystem;
    static startP = 0;
    
    static async init() {
        Utils.devModules.controls.enabled = false;
        Global.sm.camera.position.z = 30;
        FBX.loadModel('eiffel-tower').then((tg:any) => {
            tg.remove(tg.children[1]);
            tg.remove(tg.children[1]);
            this.loadedModel = tg.children[0];
            this.loadedModel.rotation.set(0, 0, 0);
            this.loadedModel.scale.set(.1, .1, .1);
            this.loadedModel.geometry.center();

            Game.particleExample();
        });

        // document.getElementsByTagName('img')[0].style.top = window.innerHeight / 2 - 100 + "px";
    }


    static async particleExample() {
        Global.sm.renderer.setClearColor(0x000000);
        let texture = await TextureHelper.getTexture("./assets/particle/sample/images/particle5.png");
        var particles = new THREE.Geometry();
        this.pMaterial = new THREE.PointsMaterial({
            color: 0xff9900,
            size: .2,
            map: texture,
            blending: 5,
            transparent: true
        });

        let geo = new THREE.PlaneBufferGeometry(250, 250, 50, 50);
        geo = this.loadedModel.geometry;
        let pos = geo.attributes.position;

        for (let i = 0; i < pos.length; i += 48) {
            let arr = pos.array;
            var pX = arr[i],
                pY = arr[i + 1],
                pZ = arr[i + 2],
                particle = new THREE.Vector3(pX, pY, pZ);
            particles.vertices.push(particle);

            particle.velocity = new THREE.Vector3(0, Math.random() * 2 * 0, 0);
        }
        this.particleSystem = new THREE.Points(
            particles,
            this.pMaterial);

        this.amount = this.particleSystem.geometry.vertices.length / 2;
        this.particleSystem.sortParticles = true;
        this.particleSystem.rotation.y += Math.PI;
        this.startAnimation();
    }

    static startAnimation() {
        this.particleSystem.rotation.y = Math.PI / 2;
        this.particleSystem.geometry.vertices.forEach((v, i) => {
            v.zCof = Math.random()  > 0.5 ? 1 : - 1;
            v.def = { x: v.x, y: v.y, z: v.z };
            v.isTower = false;
            let val = (i - this.amount);
            let r = Math.random() * 2 - 2 + 10;
            v.x = r * Math.cos(val);
            v.y = r * Math.sin(val);
            v.z = 0;
        });

        this.particleSystem.geometry.verticesNeedUpdate = true;

        function updateCircle() {
            this.particleSystem.geometry.vertices.forEach((v, i) => {
                    if (v.z > 5 || v.z < -5) {
                        v.zCof *= -1;
                        v.velocity.z = 0;
                    }

                    v.velocity.z += Math.random() * .001 * v.zCof;
                    v.add(v.velocity);
            });

            this.particleSystem.geometry.verticesNeedUpdate = true;
        }

        Utils.devModules.ps = {
            update: updateCircle.bind(this)
        }

        let angle = 0;

        Utils.devModules.psr = {
            update: () => {
                if (this.particleSystem.rotation.z > Math.PI * 2) {
                    this.particleSystem.rotation.z -= Math.PI * 2;
                }
                this.particleSystem.rotation.z += Math.PI / 720;
                angle += Math.PI/720;
                if(angle > Math.PI){
                    this.createTower();
                }
            }
        }


        // setTimeout(() => {
            // document.getElementById('loading').style.display = 'none';
            // document.getElementById('content').style.opacity = '1';
        // },3000);
        Global.gameService.assetsLoaded = true;


        Global.sm.scene.add(this.particleSystem);
    }

    static createTower() {

        // setTimeout(() => {
        //     document.getElementsByClassName('title')[0].classList.add('hide');
        //     document.getElementsByClassName('title')[1].classList.remove('hide');
        //     document.getElementsByClassName('title')[1].classList.add('show');
        // }, 1000);


        delete Utils.devModules.ps;
        delete Utils.devModules.psr;
        function animation() {
            if(this.startP == this.particleSystem.geometry.vertices.length){
                delete Utils.devModules.ps;
                Utils.devModules.controls.minDistance = 100;
            }
            this.particleSystem.geometry.vertices.forEach((v, i) => {
                

                if (Math.abs(v.def.x - v.x) < 1) {
                    v.velocity.x = 0;
                    v.x = v.def.x;
                }
                if (Math.abs(v.def.y - v.y) < 1) {
                    v.velocity.y = 0;
                    v.y = v.def.y;
                }
                if (Math.abs(v.def.z - v.z) < 1) {
                    v.velocity.z = 0;
                    v.z = v.def.z;
                }

                if(v.x == v.def.x && v.y == v.def.y && v.z == v.def.z && !v.isTower){
                    this.startP++;
                    v.isTower = true;
                }

                let xd = v.def.x - v.x > 0 ? 1 : -1;
                let yd = v.def.y - v.y > 0 ? 1 : -1;
                let zd = v.def.z - v.z > 0 ? 1 : -1;

                v.velocity.x += Math.random() * .001 * xd;
                v.velocity.y += Math.random() * .001 * yd;
                v.velocity.z += Math.random() * .001 * zd;
                v.add(v.velocity);
            });

            this.particleSystem.geometry.verticesNeedUpdate = true;
        }

        Utils.devModules.ps = {
            update: animation.bind(this)
        }

        this.normalizeTower();
    }

    static normalizeTower() {

        Utils.devModules.psnr = {
            update: () => {
                this.particleSystem.rotation.z -= Math.PI / 360;
                if (this.particleSystem.rotation.z <= 0) {
                    this.particleSystem.rotation.z = 0;
                    delete Utils.devModules.psnr;
                }
            }
        }

        Utils.devModules.psns = {
            update: () => {
                this.pMaterial.size += 0.001;
                if (this.pMaterial.size >= 1) {
                    this.pMaterial.size = 1;
                    delete Utils.devModules.psns;
                }
            }
        }

        Utils.devModules.cpz = {
            update: () => {
                Global.sm.camera.position.z += 0.5;
                if (Global.sm.camera.position.z >= 350) {
                    Global.sm.camera.position.z = 350;
                    Utils.devModules.controls.autoRotate = true;
                    delete Utils.devModules.cpz;
                    Utils.devModules.controls.enabled = true;
                   
                }
            }
        }

        Utils.devModules.cpy = {
            update: () => {
                Global.sm.camera.position.y += 0.2;
                if (Global.sm.camera.position.y >= 50) {
                    Global.sm.camera.position.y = 50;
                    delete Utils.devModules.cpy;
                }
            }
        }
    }

}

export default Game;
