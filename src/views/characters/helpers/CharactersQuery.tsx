import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
    query getCharacters($page: Int, $searchWord: String, $selectedStatus: String) {
        characters(page: $page, filter: { name: $searchWord, status: $selectedStatus }) {
            results {
                id
                name
                image
            }
        }
    }
`;
