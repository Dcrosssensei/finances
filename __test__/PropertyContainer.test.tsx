import { ColorsApp } from "@/app/constants";
import PropertyContainer from "@/app/pages/details/components/PropertyContainer";
import React from "react";
import { Text, View } from "react-native";
import renderer from "react-test-renderer";
import { getNestedChild } from "./helpers/nestedChildAux";


describe('PropertyContainer', () => {
    let tree: any
    beforeAll(()=>{
        tree = renderer.create(
        <PropertyContainer >
              <View >
                <Text>Soy un texto</Text>
              </View>
        </PropertyContainer>
        ).toJSON();
    })
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
      });

    it('PropertyContainer render text', () => {
        const textRendered = getNestedChild(tree,3);  
        expect(textRendered).toEqual("Soy un texto");
      });

  });

