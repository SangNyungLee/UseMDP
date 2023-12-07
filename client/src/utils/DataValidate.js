export function validateUnspecifiedPlannerData(data) {
    // JSON Schema 정의
    const schema = {
        type: 'object',
        properties: {
            plannerId: { type: 'integer' },
            creator: { type: 'string' },
            title: { type: 'string' },
            likePlanner: { type: 'integer' },
            thumbnail: { type: 'string' },
            plannerAccess: { type: 'string' },
            isDefault: { type: 'integer' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            taglist: {
                type:'array',
                items: { type: 'string' },
            },
            cards: {
                type: 'array',
                items: {
                    type:'array',
                    items:{
                        type: 'object',
                        properties: {
                            cardId: { type: 'string' },
                            title: { type: 'string' },
                            coverColor: { type: 'string' },
                            post: { type: 'string' },
                            intOrder: { type: 'integer' },
                            startDate: { type: 'string' },
                            endDate: { type: 'string' },
                            cardStatus: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            checklists: {
                                type: 'array',
                                items: { type: 'object' }
                            },
                            sourceResource: { type: 'null' },
                        },
                        required: [ 'cardId', 'post' ,'title', 'coverColor', 'startDate', 'endDate', 'cardStatus', 'intOrder'],
                    }
                },
            },
        },
        required: [ 'cards' ],
    };
  
    // 검증
    const Ajv = require('ajv');
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
  
    const isValid = validate(data);
    
    return isValid
};