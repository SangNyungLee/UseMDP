// 사용되지 않았으나 사용 가능한 로직
// enum: ["red", "green", "blue"]   : 이 3개의 값 중에 하나여야만 허용
// format: "email"   :  데이터 형식을 명시적으로 표기 (그 외 "date-time", "uri"등이 가능)
// pattern: "^[A-Za-z]+$"   :  우리가 알고 있는 그 패턴 형식
// minimum: 1   ,  maximum: 100   :   type:integer에서만 사용 가능 최댓갑 최소값ㅌ

export function validatePlannerData(data) {
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
            cards: {
                type: 'array',
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            cardId: { type: 'string' },
                            post: { type: 'string' },
                            title: { type: 'string' },
                            coverColor: { type: 'string' },
                            startDate: { type: 'string' },
                            endDate: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            cardStatus: { type: 'string' },
                            checklists: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        checklistId: { type: 'integer' },
                                        checked: { type: 'integer' },
                                        title: { type: 'string' },
                                        createdAt: { type: 'string' },
                                        updatedAt: { type: 'string' },
                                    },
                                    required: [ 'checklistId', 'checked', 'title' ]
                                }
                            },
                            intOrder: { type: 'integer' },
                            sourceResource: { type: 'null' },
                        },
                        required: [ 'cardId', 'post' ,'title', 'coverColor', 'startDate', 'endDate', 'cardStatus', 'checklists', 'intOrder'],
                    },
                },
            },
        },
        required: [ 'plannerId', 'creator' ,'title', 'cards'],
    };
  
    // 검증
    const Ajv = require('ajv');
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
  
    const isValid = validate(data);
  
    // if (!isValid) {
    //   console.error('Received data does not match the expected format:', validate.errors);
    //   // 여기서 에러 처리 또는 원하는 작업을 수행할 수 있습니다.
    // } else {
    //   // 데이터가 유효할 경우 원하는 작업을 수행합니다.
    //   console.log('Received data is valid:', data);
    // }

    return isValid
};

export function validateUnspecifiedPlannerData(data) {
    // JSON Schema 정의
    const schema = {
        type: 'object',
        properties: {
            cards: {
                type: 'array',
                items: {
                        type: 'object',
                        properties: {
                            cardId: { type: 'string' },
                            post: { type: 'string' },
                            title: { type: 'string' },
                            coverColor: { type: 'string' },
                            startDate: { type: 'string' },
                            endDate: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            cardStatus: { type: 'string' },
                            checklists: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        checklistId: { type: 'integer' },
                                        checked: { type: 'integer' },
                                        title: { type: 'string' },
                                        createdAt: { type: 'string' },
                                        updatedAt: { type: 'string' },
                                    },
                                    required: [ 'checklistId', 'checked', 'title' ]
                                }
                            },
                            intOrder: { type: 'integer' },
                            sourceResource: { type: 'null' },
                        },
                        required: [ 'cardId', 'post' ,'title', 'coverColor', 'startDate', 'endDate', 'cardStatus', 'checklists', 'intOrder'],
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
  
    // if (!isValid) {
    //   console.error('Received data does not match the expected format:', validate.errors);
    //   // 여기서 에러 처리 또는 원하는 작업을 수행할 수 있습니다.
    // } else {
    //   // 데이터가 유효할 경우 원하는 작업을 수행합니다.
    //   console.log('Received data is valid:', data);
    // }

    return isValid
};

export function validatePlannerListData(data) {
    // JSON Schema 정의
    const schema = {
        type:'array',
        items: {
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
                cards: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                cardId: { type: 'string' },
                                post: { type: 'string' },
                                title: { type: 'string' },
                                coverColor: { type: 'string' },
                                startDate: { type: 'string' },
                                endDate: { type: 'string' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                                cardStatus: { type: 'string' },
                                checklists: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            checklistId: { type: 'integer' },
                                            checked: { type: 'integer' },
                                            title: { type: 'string' },
                                            createdAt: { type: 'string' },
                                            updatedAt: { type: 'string' },
                                        },
                                        required: [ 'checklistId', 'checked', 'title' ]
                                    }
                                },
                                intOrder: { type: 'integer' },
                                sourceResource: { type: 'null' },
                            },
                            required: [ 'cardId', 'post' ,'title', 'coverColor', 'startDate', 'endDate', 'cardStatus', 'checklists', 'intOrder'],
                        },
                    },
                },
            },
            required: [ 'plannerId', 'creator' ,'title', 'cards'],
        }
    };
  
    // 검증
    const Ajv = require('ajv');
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
  
    const isValid = validate(data);
  
    // if (!isValid) {
    //   console.error('Received data does not match the expected format:', validate.errors);
    //   // 여기서 에러 처리 또는 원하는 작업을 수행할 수 있습니다.
    // } else {
    //   // 데이터가 유효할 경우 원하는 작업을 수행합니다.
    //   console.log('Received data is valid:', data);
    // }

    return isValid
};

export function validateUnspecifiedPlannerListData(data) {
    // JSON Schema 정의
    const schema = {
        type:'array',
        items: {
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
                cards: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            cardId: { type: 'string' },
                            post: { type: 'string' },
                            title: { type: 'string' },
                            coverColor: { type: 'string' },
                            startDate: { type: 'string' },
                            endDate: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            cardStatus: { type: 'string' },
                            checklists: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        checklistId: { type: 'integer' },
                                        checked: { type: 'integer' },
                                            title: { type: 'string' },
                                        createdAt: { type: 'string' },
                                        updatedAt: { type: 'string' },
                                    },
                                    required: [ 'checklistId', 'checked', 'title' ]
                                }
                            },
                            intOrder: { type: 'integer' },
                            sourceResource: { type: 'null' },
                        },
                        required: [ 'cardId', 'post' ,'title', 'coverColor', 'startDate', 'endDate', 'cardStatus', 'checklists', 'intOrder'],
                    },
                },
            },
            required: [ 'plannerId', 'creator' ,'title', 'cards'],
        }
    };
  
    // 검증
    const Ajv = require('ajv');
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
  
    const isValid = validate(data);
  
    // if (!isValid) {
    //   console.error('Received data does not match the expected format:', validate.errors);
    //   // 여기서 에러 처리 또는 원하는 작업을 수행할 수 있습니다.
    // } else {
    //   // 데이터가 유효할 경우 원하는 작업을 수행합니다.
    //   console.log('Received data is valid:', data);
    // }

    return isValid
};