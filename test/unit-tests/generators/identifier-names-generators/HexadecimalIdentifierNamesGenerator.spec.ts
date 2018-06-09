import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { TNodeWithBlockScope } from '../../../../src/types/node/TNodeWithBlockScope';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';
import { NodeFactory } from '../../../../src/node/NodeFactory';

describe('HexadecimalIdentifierNamesGenerator', () => {
    describe('generate', () => {
        let identifierNamesGenerator: IIdentifierNamesGenerator,
            hexadecimalIdentifierName: string,
            regExp: RegExp;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', {});
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
            );

            hexadecimalIdentifierName = identifierNamesGenerator.generate();
            regExp = /^_0x(\w){4,6}$/;
        });

        it('should return hexadecimal name', () => {
            assert.match(hexadecimalIdentifierName, regExp);
        })
    });

    describe('generateWithPrefix (): string', () => {
        const regExp: RegExp = /^foo_0x(\w){4,6}$/;

        let identifierNamesGenerator: IIdentifierNamesGenerator,
            hexadecimalIdentifierName: string;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', {
                identifiersPrefix: 'foo'
            });
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
            );

            hexadecimalIdentifierName = identifierNamesGenerator.generateWithPrefix();
        });

        it('should return hexadecimal name with prefix', () => {
            assert.match(hexadecimalIdentifierName, regExp);
        })
    });

    describe('generateForBlockScope', () => {
        let identifierNamesGenerator: IIdentifierNamesGenerator,
            hexadecimalIdentifierName: string,
            regExp: RegExp;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', {});
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
            );

            const blockScopeNode: TNodeWithBlockScope = NodeFactory.blockStatementNode([]);

            hexadecimalIdentifierName = identifierNamesGenerator.generateForBlockScope(blockScopeNode);
            regExp = /^_0x(\w){4,6}$/;
        });

        it('should return hexadecimal name for block scope', () => {
            assert.match(hexadecimalIdentifierName, regExp);
        })
    });
});
