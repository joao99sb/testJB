/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import {
  describe, expect, jest, test, beforeEach,
} from '@jest/globals';
import { ProductRepository } from '../../repositories/productRepository';
import { Product } from '../../schema/productSchema';

describe('#Repository - test api responses', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('successful', () => {
    test('should list all products ', async () => {
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
        .spyOn(Product, 'find')
        .mockImplementation(async () => Promise.resolve(expectedResults));

      const productRepository = new ProductRepository();

      const result = await productRepository.showProduct();

      expect(result).toBe(expectedResults);
    });

    test('should create a new products ', async () => {
      const params = {
        name: 'test1',
        color: 'green',
        value: 23,
      };

      const expectedResults = {
        name: 'test1',
        color: 'green',
        value: 23,
        _id: '630f6e21e8b9e439ba46986d',
        __v: 0,
      };
      jest
        .spyOn(Product, 'create')
        .mockImplementation(async () => Promise.resolve(expectedResults));

      const productRepository = new ProductRepository();

      const result = await productRepository.insertProduct(params);

      expect(result).toBe(expectedResults);
    });

    test('should delete a existent product ', async () => {
      const params = {
        id: '630f6e21e8b9e439ba46986d',
      };

      jest
        .spyOn(Product, 'deleteOne')
        .mockImplementation(async () => Promise.resolve());

      const productRepository = new ProductRepository();

      await productRepository.removeProduct(params);

      expect(Product.deleteOne).toHaveBeenCalled();
    });

    test('should update a existent product ', async () => {
      const params = {
        id: '630f6e21e8b9e439ba46986d',
        name: 'nome2',
        color: 'blue',
        value: 23,
      };

      const expectedResults = {
        name: 'test1',
        color: 'green',
        value: 23,
        _id: '630f6e21e8b9e439ba46986d',
        __v: 0,
        save: jest.fn(),
      };

      jest
        .spyOn(Product, 'findOne')
        .mockImplementation(async () => Promise.resolve(expectedResults));

      const productRepository = new ProductRepository();

      const result = await productRepository.updateProduct(params);

      expect(Product.findOne).toHaveBeenCalledWith({ _id: params.id });
      expect(result.save).toHaveBeenCalled();
    });
  });

  describe('exceptions', () => {
    test('should throw error if mongoDb fail ', async () => {
      jest
        .spyOn(Product, 'find')
        .mockImplementation(async () => { throw new Error('db fail'); });

      const productRepository = new ProductRepository();
      try {
        const result = await productRepository.showProduct();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('db fail');
      }
    });

    test('should throw error if validation fail', async () => {
      const params = {
        color: 'blue',
        value: 23,
      };

      const productRepository = new ProductRepository();
      try {
        const result = await productRepository.insertProduct(params);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('invalid data');
      }
    });
    test('should throw error if db fail', async () => {
      const params = {
        name: 'zoro',
        color: 'blue',
        value: 23,
      };
      jest
        .spyOn(Product, 'create')
        .mockImplementation(async () => { throw new Error('db fail'); });

      const productRepository = new ProductRepository();
      try {
        const result = await productRepository.insertProduct(params);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('db fail');
      }
    });

    test('should throw error if id doenst exists or db fail', async () => {
      const params = {
        id: '630f6e21e8b9e439ba46986d',
      };

      jest
        .spyOn(Product, 'deleteOne')
        .mockImplementation(async () => { throw new Error('db fail'); });

      const productRepository = new ProductRepository();
      try {
        await productRepository.removeProduct(params);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('db fail');
      }
    });

    test('should throw error if id doenst exists or db fail', async () => {
      const params = {
        id: '630f6e21e8b9e439ba46986d',
      };

      jest
        .spyOn(Product, 'findOne')
        .mockImplementation(async () => { throw new Error('db fail'); });

      const productRepository = new ProductRepository();
      try {
        await productRepository.updateProduct(params);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('db fail');
      }
    });
  });
});
