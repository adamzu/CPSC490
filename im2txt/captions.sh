MODEL_PATH="${PWD}/im2txt/model"
CHECKPOINT_PATH="${MODEL_PATH}/model.ckpt-2000000"
VOCAB_FILE="${MODEL_PATH}/word_counts.txt"
IMAGE_FILE="${HOME}/test.jpg"

# Build the inference binary.
bazel build -c opt im2txt/run_inference

# Run inference to generate captions.
bazel-bin/im2txt/run_inference \
  --checkpoint_path=${CHECKPOINT_PATH} \
  --vocab_file=${VOCAB_FILE} \
  --input_files=${IMAGE_FILE}
