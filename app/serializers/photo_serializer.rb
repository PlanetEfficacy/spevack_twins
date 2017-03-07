class PhotoSerializer < ActiveModel::Serializer
  attributes  :id,
              :title,
              :caption,
              :date,
              :image,
              :created_at,
              :updated_at
end
