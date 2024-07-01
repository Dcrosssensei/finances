import ListEmptyComponent from "@/app/pages/home/components/listComponent/components/ListEmptyComponent";
import React from "react";
import renderer from "react-test-renderer";


describe('ListEmptyComponent with message', () => {
    let tree: any
    beforeAll(()=>{
        tree = renderer.create(
        <ListEmptyComponent
        emptyProps={{
            message: 'lamentamos los inconvenientes'
        }}
        />
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

    it('renders message', () => {
        const nameRendered = tree.children[0].children[0];
        expect(nameRendered).toEqual("lamentamos los inconvenientes");
      });

  });

describe('ListEmptyComponent without message', () => {
    let tree: any
    beforeAll(()=>{
        tree = renderer.create(
        <ListEmptyComponent />
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

    it('renders message', () => {
        const nameRendered = tree.children[0].children[0];
        expect(nameRendered).toEqual("No se encontraron Resultados");
      });

  });
