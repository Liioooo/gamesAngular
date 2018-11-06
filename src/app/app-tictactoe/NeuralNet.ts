import * as tf from '@tensorflow/tfjs';

export class NeuralNet {

    private model: tf.Model;

    constructor() {

    }

    async load() {
        const host = window.location.protocol + "//" + window.location.host;
        this.model = await tf.loadModel(host + '/assets/tf_tictactoeModel/ticTacToe_Model_tfjs.json');
        this.model.compile({
            optimizer: 'rmsprop',
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
        });
    }

    predict(data) {
        return tf.tidy(() => {
            return this.model.predict(tf.tensor2d(data, [3, 3]).reshape([1, 3, 3]));
        });
    }

}