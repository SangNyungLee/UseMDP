import LZUTF8 from "lzutf8";

export default function DataDownload(title,content){
    const jsonContent = JSON.stringify(content,null,2)
    // null 자리는 특정 키를 제외할 경우 추가
    // 2는 json 문자열이 읽히기 쉽도록 2칸씩 들여쓰기 되게 하는것
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title + '-' + new Date().toISOString() + '.json';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// export function lzutf8ImgCompress(img){
//     console.log(img)
//     const textDecoder = new TextDecoder('utf-8'); // 또는 다른 인코딩 설정 가능
//     const decodedString = textDecoder.decode(img);
//     console.log(decodedString.length);
//     const compressedString = LZUTF8.compress(decodedString,{outputEncoding: "Base64"});
//     const twoCompressedString = LZUTF8.compress(compressedString,{outputEncoding: "Base64"});
//     console.log(compressedString.length);
//     return compressedString;
// }

export function lzutf8Compress(originArr){
    // 객체 배열 압축 참고용
    const jsonString = JSON.stringify(originArr);
    const compressedString = LZUTF8.compress(jsonString,{outputEncoding: "Base64"});
    return compressedString;
}

export function lzutf8Decompress(compressedString){
    // 객체 배열 압축 해제 참고용
    const decompressedString = LZUTF8.decompress(compressedString,{inputEncoding:"Base64"});
    const originArr = JSON.parse(decompressedString)
    return originArr;
}

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
                                        checked: { type: 'boolean' },
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
                                        checked: { type: 'boolean' },
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
                                            checked: { type: 'boolean' },
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
                                        checked: { type: 'boolean' },
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