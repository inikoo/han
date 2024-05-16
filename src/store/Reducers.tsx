import { WriteCredential } from '../Utils/auth';

export default {
  userReducer(state = {}, action: object) {
    switch (action.type) {
      case 'CreateClokingMachineSession':
        state = {
          id: action.payload.token,
          organisation_slug: action.payload.organisation_slug,
          workplace_slug: action.payload.workplace_slug,
          slug: action.payload.slug,
          name: action.payload.name,
          type: action.payload.type,
          created_at: action.payload.created_at,
          updated_at: action.payload.updated_at,
          nfc_tag: action.payload.nfc_tag,
        };
        WriteCredential(state);
        break;
      case 'DestroyClokingMachineSession':
        state = {
          id: null,
          organisation_slug: null,
          workplace_slug: null,
          slug: null,
          name: null,
          type: null,
          created_at: null,
          updated_at: null,
          nfc_tag: null,
        };
        break;
    }
    return state;
  },

 
};
