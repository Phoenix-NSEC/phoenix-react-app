import SibApiV3Sdk from "sib-api-v3-sdk";

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey =
  defaultClient.authentications[
    "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"
  ];
apiKey.apiKey =
  "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";

export default defaultClient;
