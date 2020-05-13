class Message < ApplicationRecord
  blongs_to :user
  blongs_to :group

  validates :content, presence: true, unless: :image?
end
