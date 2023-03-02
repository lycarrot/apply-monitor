'use strict';

import compose from 'koa-compose';
import errorHandler from './errorHandler';

export default () => {
    return compose(
        [
            postProcessing,
            errorHandler
        ]
    )
}