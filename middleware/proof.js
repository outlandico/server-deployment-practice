'use strict';
function proof( req, res, next ) {
    req.proofofAdam = " Adam is real";
    next();

}

module.exports = proof;