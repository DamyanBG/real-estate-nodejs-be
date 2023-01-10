import express from 'express';
import cors from 'cors';

export default (app) => {
    app.use(cors());
    app.use(express.json());
    // TODO auth middleware later
    app.use(express.urlencoded({ extended: true }));
};
