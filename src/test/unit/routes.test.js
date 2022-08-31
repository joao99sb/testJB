/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import {
  describe, expect, jest, test, beforeEach,
} from '@jest/globals';
import { ProductController } from '../../controllers/productController';
import { ProductRepository } from '../../repositories/productRepository';

describe('#Routes - test api responses', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('successful routes', () => {
    test('GET /Product - should list all products ', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      const expectedResults = [
        {
          _id: '630ec1e91080483d56bc5a62',
          name: 'zezinho',
          color: 'blue',
          value: 1233,
          __v: 0,
        },
        {
          _id: '630ed9af5cb8939f27add4f9',
          name: 'pirolio',
          color: 'blue',
          value: 15,
          __v: 0,
        },
      ];

      jest
        .spyOn(
          ProductRepository.prototype,
          ProductRepository.prototype.showProduct.name,
        )
        .mockResolvedValue(expectedResults);

      const productController = new ProductController();

      await productController.show(mReq, mRes);

      expect(ProductRepository.prototype.showProduct).toHaveBeenCalled();

      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toBeCalledWith({ ok: true, product: expectedResults });
    });

    test('POST /Product - should create a new products ', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      const params = {
        name: 'test1',
        color: 'green',
        value: 23,
      };
      mReq.body = params;

      const expectedResults = {
        name: 'test1',
        color: 'green',
        value: 23,
        _id: '630f6e21e8b9e439ba46986d',
        __v: 0,
      };

      jest
        .spyOn(
          ProductRepository.prototype,
          ProductRepository.prototype.insertProduct.name,
        )
        .mockResolvedValue(expectedResults);

      const productController = new ProductController();

      await productController.create(mReq, mRes);

      expect(ProductRepository.prototype.insertProduct).toHaveBeenCalled();

      expect(mRes.status).toBeCalledWith(201);
      expect(mRes.json).toBeCalledWith({ ok: true, product: expectedResults });
    });

    test('DELETE /Product/:id - should delete a existent product ', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      const params = {
        id: '630f6e21e8b9e439ba46986d',
      };

      mReq.params = params;

      jest.spyOn(
        ProductRepository.prototype,
        ProductRepository.prototype.removeProduct.name,
      );

      const productController = new ProductController();

      await productController.remove(mReq, mRes);

      expect(ProductRepository.prototype.removeProduct).toHaveBeenCalledWith(
        params.id,
      );

      expect(mRes.status).toBeCalledWith(204);
      expect(mRes.json).toBeCalledWith({ ok: true });
    });

    test('PUT /Product/:id - should update a existent product ', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      const params = {
        id: '630f6e21e8b9e439ba46986d',
      };
      const body = {
        name: 'test1',
        color: 'green',
        value: 23,
      };

      mReq.body = body;
      mReq.params = params;

      const expectedResults = {
        name: 'test1',
        color: 'green',
        value: 23,
        _id: '630f6e21e8b9e439ba46986d',
        __v: 0,
      };

      jest
        .spyOn(
          ProductRepository.prototype,
          ProductRepository.prototype.updateProduct.name,
        )
        .mockResolvedValue(expectedResults);

      const productController = new ProductController();

      await productController.update(mReq, mRes);

      expect(ProductRepository.prototype.updateProduct).toHaveBeenCalledWith({
        ...params,
        ...body,
      });

      expect(mRes.status).toBeCalledWith(201);
      expect(mRes.json).toBeCalledWith({ ok: true, product: expectedResults });
    });
  });

  describe('exceptions', () => {
    test('GET /Product - should throw error if repository fail ', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      jest
        .spyOn(
          ProductRepository.prototype,
          ProductRepository.prototype.showProduct.name,
        )
        .mockImplementation(() => {
          throw new Error('deu ruim');
        });

      const productController = new ProductController();

      await productController.show(mReq, mRes);

      expect(ProductRepository.prototype.showProduct).toHaveBeenCalled();

      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.json).toBeCalledWith({ ok: false, error: 'deu ruim' });
    });

    test('POST /Product - should throw error if repository fail', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      const params = {
        name: 'algum',
        color: 'green',
        value: 23,
      };
      mReq.body = params;

      jest
        .spyOn(
          ProductRepository.prototype,
          ProductRepository.prototype.insertProduct.name,
        ).mockImplementation(() => {
          throw new Error('deu ruim');
        });

      const productController = new ProductController();

      await productController.create(mReq, mRes);

      expect(ProductRepository.prototype.insertProduct).toHaveBeenCalled();

      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.json).toBeCalledWith({ ok: false, error: 'deu ruim' });
    });

    test('DELETE /Product/:id - should throw error if repository fail', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      const params = {
        id: '630f6e21e8b9e439ba46986d',
      };

      mReq.params = params;

      jest.spyOn(
        ProductRepository.prototype,
        ProductRepository.prototype.removeProduct.name,
      ).mockImplementation(() => {
        throw new Error('deu ruim');
      });

      const productController = new ProductController();

      await productController.remove(mReq, mRes);

      expect(ProductRepository.prototype.removeProduct).toHaveBeenCalledWith(
        params.id,
      );

      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.json).toBeCalledWith({ ok: false, error: 'deu ruim' });
    });

    test('PUT /Product/:id - should throw error if repository fail', async () => {
      const mReq = {};
      const mRes = { status: jest.fn(), json: jest.fn() };

      mRes.status.mockImplementation(function (status) {
        return this;
      });

      const params = {
        id: '630f6e21e8b9e439ba46986d',
      };
      const body = {
        name: 'test1',
        color: 'green',
        value: 23,
      };

      mReq.body = body;
      mReq.params = params;

      jest
        .spyOn(
          ProductRepository.prototype,
          ProductRepository.prototype.updateProduct.name,
        )
        .mockImplementation(() => {
          throw new Error('deu ruim');
        });

      const productController = new ProductController();

      await productController.update(mReq, mRes);

      expect(ProductRepository.prototype.updateProduct).toHaveBeenCalledWith({
        ...params,
        ...body,
      });

      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.json).toBeCalledWith({ ok: false, error: 'deu ruim' });
    });
  });
});
